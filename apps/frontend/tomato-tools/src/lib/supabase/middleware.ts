import { createServerClient } from '@supabase/ssr';
import { NextRequest, NextResponse } from 'next/server';
import { createModuleLogger, generateCorrelationId } from '@/lib/logger';

const log = createModuleLogger('supabase-middleware');

export async function updateSession(request: NextRequest) {
  // 生成或获取关联ID
  const correlationId = request.headers.get('x-correlation-id') || generateCorrelationId();
  const requestLogger = log.child({ correlationId, path: request.nextUrl.pathname });
  
  requestLogger.debug('Processing request');

  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // 刷新会话
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error) {
      requestLogger.warn({ error: error.message }, 'Auth error in middleware');
    } else if (user) {
      requestLogger.debug({ userId: user.id }, 'User authenticated');
    }
  } catch (error) {
    requestLogger.error({ error }, 'Failed to get user in middleware');
  }

  // 添加关联ID到响应头
  supabaseResponse.headers.set('x-correlation-id', correlationId);
  
  requestLogger.debug('Request processed successfully');
  return supabaseResponse;
}