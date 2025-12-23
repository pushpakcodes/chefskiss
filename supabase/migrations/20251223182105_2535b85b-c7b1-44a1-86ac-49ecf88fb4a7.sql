-- Add total_tips column to profiles for leaderboard
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS total_tips_received numeric DEFAULT 0;

-- Create a function to get chef leaderboard with total tips
CREATE OR REPLACE FUNCTION public.get_chef_leaderboard(limit_count integer DEFAULT 10)
RETURNS TABLE (
  chef_id uuid,
  full_name text,
  specialty text,
  avatar_url text,
  total_tips numeric,
  tip_count bigint
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 
    p.id as chef_id,
    p.full_name,
    p.specialty,
    p.avatar_url,
    COALESCE(SUM(t.amount), 0) as total_tips,
    COUNT(t.id) as tip_count
  FROM profiles p
  LEFT JOIN tips t ON t.chef_id = p.id AND t.status = 'completed'
  WHERE p.role = 'chef'
  GROUP BY p.id, p.full_name, p.specialty, p.avatar_url
  ORDER BY total_tips DESC
  LIMIT limit_count;
$$;

-- Create index for better performance on chef queries
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);
CREATE INDEX IF NOT EXISTS idx_tips_chef_status ON public.tips(chef_id, status);