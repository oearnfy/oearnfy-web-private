import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';

export const dynamic = 'force-dynamic';

const SCOPES = [
  'https://www.googleapis.com/auth/youtube.readonly',
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/cloud-platform'
];

const oauth2Client = new OAuth2Client({
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  redirectUri: 'https://oearnfy.com/api/auth/google/callback'
});

export async function GET(request: NextRequest) {
  try {
    const url = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES,
      include_granted_scopes: true
    });

    return NextResponse.redirect(url);
  } catch (error) {
    console.error('Error generating auth URL:', error);
    return NextResponse.json({ error: 'Failed to generate auth URL' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { code } = await request.json();

    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    // Enable YouTube Data API v3
    const serviceUsage = google.serviceusage('v1');
    await serviceUsage.services.enable({
      name: 'projects/oearnfy25-web/services/youtube.googleapis.com',
      auth: oauth2Client
    });

    // Create API key using Cloud Resource Manager API
    const cloudresourcemanager = google.cloudresourcemanager('v1');
    const { data: project } = await cloudresourcemanager.projects.get({
      projectId: 'oearnfy25-web'
    });

    // Create API key
    const apiKey = await fetch(
      `https://apikeys.googleapis.com/v2/projects/${project.projectNumber}/keys`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${tokens.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          displayName: 'YouTube API Key',
          restrictions: {
            apiTargets: [{
              service: 'youtube.googleapis.com'
            }]
          }
        })
      }
    ).then(res => res.json());

    return NextResponse.json({ 
      success: true,
      message: 'Google OAuth and YouTube API setup completed successfully',
      apiKey: apiKey.keyString
    });
  } catch (error) {
    console.error('Error setting up Google OAuth:', error);
    return NextResponse.json({ error: 'Failed to setup Google OAuth' }, { status: 500 });
  }
} 