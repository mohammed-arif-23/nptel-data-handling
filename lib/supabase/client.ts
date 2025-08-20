import { createBrowserClient } from "@supabase/ssr"

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  console.log("[v0] Supabase client environment check:", {
    url: supabaseUrl ? "✓ Found" : "✗ Missing",
    key: supabaseAnonKey ? "✓ Found" : "✗ Missing",
    urlLength: supabaseUrl?.length || 0,
    keyLength: supabaseAnonKey?.length || 0,
  })

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("[v0] Missing Supabase environment variables:", {
      NEXT_PUBLIC_SUPABASE_URL: !!supabaseUrl,
      NEXT_PUBLIC_SUPABASE_ANON_KEY: !!supabaseAnonKey,
      allEnvVars: Object.keys(process.env).filter((key) => key.includes("SUPABASE")),
    })
    throw new Error("Missing required Supabase environment variables. Please check your project settings.")
  }

  try {
    const client = createBrowserClient(supabaseUrl, supabaseAnonKey)
    console.log("[v0] Supabase client created successfully")
    return client
  } catch (error) {
    console.error("[v0] Failed to create Supabase client:", error)
    throw error
  }
}
