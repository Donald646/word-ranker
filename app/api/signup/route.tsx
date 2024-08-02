import { createClient } from "@/utils/supabase/server";

interface SignUpData {
  email: string;
  password: string;
}

interface SignUpResponse {
  valid: boolean;
  error: string | null;
}

export async function POST(req: Request): Promise<Response> {
  const body: SignUpData = await req.json();
  const supabase = createClient();

  // In practice, you should validate your inputs
  const data: SignUpData = { email: body.email, password: body.password };
  
  if (data.password.length < 6) {
    return Response.json({
      valid: false,
      error: "Password Must Be At Least 6 Characters",
    } as SignUpResponse);
  }

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    const polishedError = error.message
    
    return Response.json({ valid: false, error: polishedError } as SignUpResponse);
  }
  
  return Response.json({ valid: true, error: null } as SignUpResponse);
}