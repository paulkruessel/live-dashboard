import { fakeAsync, tick } from '@angular/core/testing';
import { signal } from '@angular/core';
import { of } from 'rxjs';
import { SpotifyService } from './spotify.service';
import { SpotifyAuthService } from './auth/auth-service';

describe('SpotifyService', () => {
  it('simulates local progress in 100ms steps and resets on fresh polling response', fakeAsync(() => {
    const accessToken = signal('token');
    const isAuthenticated = signal(true);

    const auth = {
      accessToken,
      isAuthenticated,
      refreshAccessToken: jasmine.createSpy('refreshAccessToken'),
    } as unknown as SpotifyAuthService;

    const http = jasmine.createSpyObj('HttpClient', ['get']);
    const service = new SpotifyService(http, auth);

    const buildPlaybackStateDto = (progressMs: number) => ({
      device: {
        id: 'device-1',
        name: 'Device',
        is_active: true,
        is_private_session: false,
        is_restricted: false,
        type: 'Computer',
        volume_percent: 50,
        supports_volume: true,
      },
      repeat_state: 'off',
      shuffle_state: false,
      context: null,
      timestamp: 1,
      progress_ms: progressMs,
      is_playing: true,
      item: {
        album: {
          album_type: 'album',
          total_tracks: 1,
          available_markets: [],
          external_urls: { spotify: 'https://example.com/album' },
          href: 'https://example.com/album',
          id: 'album-1',
          images: [{ url: 'https://example.com/cover.jpg', height: 300, width: 300 }],
          name: 'Album',
          release_date: '2024-01-01',
          release_date_precision: 'day',
          restrictions: null,
          type: 'album',
          uri: 'spotify:album:album-1',
          artists: [
            {
              external_urls: { spotify: 'https://example.com/artist' },
              href: 'https://example.com/artist',
              id: 'artist-1',
              name: 'Artist',
              type: 'artist',
              uri: 'spotify:artist:artist-1',
            },
          ],
        },
        artists: [
          {
            external_urls: { spotify: 'https://example.com/artist' },
            href: 'https://example.com/artist',
            id: 'artist-1',
            name: 'Artist',
            type: 'artist',
            uri: 'spotify:artist:artist-1',
          },
        ],
        available_markets: [],
        disc_number: 1,
        duration_ms: 2000,
        explicit: false,
        external_ids: { isrc: 'isrc-1', ean: null, upc: null },
        external_urls: { spotify: 'https://example.com/track' },
        href: 'https://example.com/track',
        id: 'track-1',
        is_playable: true,
        linked_from: null,
        name: 'Track',
        popularity: 42,
        preview_url: null,
        restrictions: null,
        track_number: 1,
        type: 'track',
        uri: 'spotify:track:track-1',
        is_local: false,
      },
      currently_playing_type: 'track',
      actions: {
        interrupting_playback: false,
        pausing: false,
        resuming: false,
        seeking: false,
        skipping_next: false,
        skipping_prev: false,
        toggling_repeat_context: false,
        toggling_shuffle: false,
        toggling_repeat_track: false,
        transferring_playback: false,
      },
    });

    http.get.and.returnValue(of(buildPlaybackStateDto(500)));
    service.refreshPlaybackState();

    expect(service.localProgressMs()).toBe(500);

    tick(100);
    expect(service.localProgressMs()).toBe(600);

    http.get.and.returnValue(of(buildPlaybackStateDto(1500)));
    service.refreshPlaybackState();

    expect(service.localProgressMs()).toBe(1500);

    tick(100);
    expect(service.localProgressMs()).toBe(1600);
  }));
});
