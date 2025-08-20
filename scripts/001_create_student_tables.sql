-- Create student tables for Class A and Class B
CREATE TABLE IF NOT EXISTS class_a_students (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  roll_number TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  week_1_status TEXT DEFAULT 'not_started' CHECK (week_1_status IN ('not_started', 'in_progress', 'completed')),
  week_2_status TEXT DEFAULT 'not_started' CHECK (week_2_status IN ('not_started', 'in_progress', 'completed')),
  week_3_status TEXT DEFAULT 'not_started' CHECK (week_3_status IN ('not_started', 'in_progress', 'completed')),
  week_4_status TEXT DEFAULT 'not_started' CHECK (week_4_status IN ('not_started', 'in_progress', 'completed')),
  week_5_status TEXT DEFAULT 'not_started' CHECK (week_5_status IN ('not_started', 'in_progress', 'completed')),
  week_6_status TEXT DEFAULT 'not_started' CHECK (week_6_status IN ('not_started', 'in_progress', 'completed')),
  week_7_status TEXT DEFAULT 'not_started' CHECK (week_7_status IN ('not_started', 'in_progress', 'completed')),
  week_8_status TEXT DEFAULT 'not_started' CHECK (week_8_status IN ('not_started', 'in_progress', 'completed')),
  week_9_status TEXT DEFAULT 'not_started' CHECK (week_9_status IN ('not_started', 'in_progress', 'completed')),
  week_10_status TEXT DEFAULT 'not_started' CHECK (week_10_status IN ('not_started', 'in_progress', 'completed')),
  week_11_status TEXT DEFAULT 'not_started' CHECK (week_11_status IN ('not_started', 'in_progress', 'completed')),
  week_12_status TEXT DEFAULT 'not_started' CHECK (week_12_status IN ('not_started', 'in_progress', 'completed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS class_b_students (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  roll_number TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  week_1_status TEXT DEFAULT 'not_started' CHECK (week_1_status IN ('not_started', 'in_progress', 'completed')),
  week_2_status TEXT DEFAULT 'not_started' CHECK (week_2_status IN ('not_started', 'in_progress', 'completed')),
  week_3_status TEXT DEFAULT 'not_started' CHECK (week_3_status IN ('not_started', 'in_progress', 'completed')),
  week_4_status TEXT DEFAULT 'not_started' CHECK (week_4_status IN ('not_started', 'in_progress', 'completed')),
  week_5_status TEXT DEFAULT 'not_started' CHECK (week_5_status IN ('not_started', 'in_progress', 'completed')),
  week_6_status TEXT DEFAULT 'not_started' CHECK (week_6_status IN ('not_started', 'in_progress', 'completed')),
  week_7_status TEXT DEFAULT 'not_started' CHECK (week_7_status IN ('not_started', 'in_progress', 'completed')),
  week_8_status TEXT DEFAULT 'not_started' CHECK (week_8_status IN ('not_started', 'in_progress', 'completed')),
  week_9_status TEXT DEFAULT 'not_started' CHECK (week_9_status IN ('not_started', 'in_progress', 'completed')),
  week_10_status TEXT DEFAULT 'not_started' CHECK (week_10_status IN ('not_started', 'in_progress', 'completed')),
  week_11_status TEXT DEFAULT 'not_started' CHECK (week_11_status IN ('not_started', 'in_progress', 'completed')),
  week_12_status TEXT DEFAULT 'not_started' CHECK (week_12_status IN ('not_started', 'in_progress', 'completed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE class_a_students ENABLE ROW LEVEL SECURITY;
ALTER TABLE class_b_students ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for class_a_students
CREATE POLICY "Allow users to view their own class A data" ON class_a_students FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Allow users to update their own class A data" ON class_a_students FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Allow users to insert their own class A data" ON class_a_students FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Allow users to delete their own class A data" ON class_a_students FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for class_b_students
CREATE POLICY "Allow users to view their own class B data" ON class_b_students FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Allow users to update their own class B data" ON class_b_students FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Allow users to insert their own class B data" ON class_b_students FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Allow users to delete their own class B data" ON class_b_students FOR DELETE USING (auth.uid() = user_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_class_a_students_updated_at BEFORE UPDATE ON class_a_students FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_class_b_students_updated_at BEFORE UPDATE ON class_b_students FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
