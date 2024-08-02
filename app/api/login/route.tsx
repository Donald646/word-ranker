import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

interface SignInData {
  email: string;
  password: string;
}

interface SignInResponse {
  valid: boolean;
  error: string | null;
}

export async function POST(req: NextRequest): Promise<NextResponse<SignInResponse>> {
  const body = await req.json();
  const supabase = createClient();

  // In practice, you should validate your inputs
  const data: SignInData = { 
    email: body.userEmail, 
    password: body.userPassword 
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return NextResponse.json({
      valid: false,
      error: "Invalid Login Credentials",
    });
  }

  return NextResponse.json({ valid: true, error: null });
}