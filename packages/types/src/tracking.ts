export interface TrackingEvent {
	eventName: string;
	eventCategory?: string;
	guestId: string;
	properties?: Record<string, unknown>;
	path?: string;
	referrer?: string;
	userAgent?: string;
	ipHash?: string;
}
