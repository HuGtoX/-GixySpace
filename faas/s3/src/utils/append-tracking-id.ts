export function appendTrackingId(rep: Response, id: string) {
    if (!rep) {
      return;
    }
    rep.headers.set('x-tracking-id', id);
  }
