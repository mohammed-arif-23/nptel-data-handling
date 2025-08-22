-- Add timestamp columns for each week to track when they were last updated
-- This enables the 2-minute cooldown system based on database timestamps

-- Add timestamp columns to ii_it_students table
ALTER TABLE ii_it_students 
ADD COLUMN week_1_updated_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN week_2_updated_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN week_3_updated_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN week_4_updated_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN week_5_updated_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN week_6_updated_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN week_7_updated_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN week_8_updated_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN week_9_updated_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN week_10_updated_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN week_11_updated_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN week_12_updated_at TIMESTAMP WITH TIME ZONE;

-- Add timestamp columns to iii_it_students table
ALTER TABLE iii_it_students 
ADD COLUMN week_1_updated_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN week_2_updated_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN week_3_updated_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN week_4_updated_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN week_5_updated_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN week_6_updated_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN week_7_updated_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN week_8_updated_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN week_9_updated_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN week_10_updated_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN week_11_updated_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN week_12_updated_at TIMESTAMP WITH TIME ZONE;

-- Add indexes for better performance on timestamp queries
CREATE INDEX idx_ii_it_week_1_updated_at ON ii_it_students(week_1_updated_at);
CREATE INDEX idx_ii_it_week_2_updated_at ON ii_it_students(week_2_updated_at);
CREATE INDEX idx_ii_it_week_3_updated_at ON ii_it_students(week_3_updated_at);
CREATE INDEX idx_ii_it_week_4_updated_at ON ii_it_students(week_4_updated_at);
CREATE INDEX idx_ii_it_week_5_updated_at ON ii_it_students(week_5_updated_at);
CREATE INDEX idx_ii_it_week_6_updated_at ON ii_it_students(week_6_updated_at);
CREATE INDEX idx_ii_it_week_7_updated_at ON ii_it_students(week_7_updated_at);
CREATE INDEX idx_ii_it_week_8_updated_at ON ii_it_students(week_8_updated_at);
CREATE INDEX idx_ii_it_week_9_updated_at ON ii_it_students(week_9_updated_at);
CREATE INDEX idx_ii_it_week_10_updated_at ON ii_it_students(week_10_updated_at);
CREATE INDEX idx_ii_it_week_11_updated_at ON ii_it_students(week_11_updated_at);
CREATE INDEX idx_ii_it_week_12_updated_at ON ii_it_students(week_12_updated_at);

CREATE INDEX idx_iii_it_week_1_updated_at ON iii_it_students(week_1_updated_at);
CREATE INDEX idx_iii_it_week_2_updated_at ON iii_it_students(week_2_updated_at);
CREATE INDEX idx_iii_it_week_3_updated_at ON iii_it_students(week_3_updated_at);
CREATE INDEX idx_iii_it_week_4_updated_at ON iii_it_students(week_4_updated_at);
CREATE INDEX idx_iii_it_week_5_updated_at ON iii_it_students(week_5_updated_at);
CREATE INDEX idx_iii_it_week_6_updated_at ON iii_it_students(week_6_updated_at);
CREATE INDEX idx_iii_it_week_7_updated_at ON iii_it_students(week_7_updated_at);
CREATE INDEX idx_iii_it_week_8_updated_at ON iii_it_students(week_8_updated_at);
CREATE INDEX idx_iii_it_week_9_updated_at ON iii_it_students(week_9_updated_at);
CREATE INDEX idx_iii_it_week_10_updated_at ON iii_it_students(week_10_updated_at);
CREATE INDEX idx_iii_it_week_11_updated_at ON iii_it_students(week_11_updated_at);
CREATE INDEX idx_iii_it_week_12_updated_at ON iii_it_students(week_12_updated_at);

-- Add comments to document the purpose of these columns
COMMENT ON COLUMN ii_it_students.week_1_updated_at IS 'Timestamp when week 1 status was last updated (for cooldown system)';
COMMENT ON COLUMN ii_it_students.week_2_updated_at IS 'Timestamp when week 2 status was last updated (for cooldown system)';
COMMENT ON COLUMN ii_it_students.week_3_updated_at IS 'Timestamp when week 3 status was last updated (for cooldown system)';
COMMENT ON COLUMN ii_it_students.week_4_updated_at IS 'Timestamp when week 4 status was last updated (for cooldown system)';
COMMENT ON COLUMN ii_it_students.week_5_updated_at IS 'Timestamp when week 5 status was last updated (for cooldown system)';
COMMENT ON COLUMN ii_it_students.week_6_updated_at IS 'Timestamp when week 6 status was last updated (for cooldown system)';
COMMENT ON COLUMN ii_it_students.week_7_updated_at IS 'Timestamp when week 7 status was last updated (for cooldown system)';
COMMENT ON COLUMN ii_it_students.week_8_updated_at IS 'Timestamp when week 8 status was last updated (for cooldown system)';
COMMENT ON COLUMN ii_it_students.week_9_updated_at IS 'Timestamp when week 9 status was last updated (for cooldown system)';
COMMENT ON COLUMN ii_it_students.week_10_updated_at IS 'Timestamp when week 10 status was last updated (for cooldown system)';
COMMENT ON COLUMN ii_it_students.week_11_updated_at IS 'Timestamp when week 11 status was last updated (for cooldown system)';
COMMENT ON COLUMN ii_it_students.week_12_updated_at IS 'Timestamp when week 12 status was last updated (for cooldown system)';

COMMENT ON COLUMN iii_it_students.week_1_updated_at IS 'Timestamp when week 1 status was last updated (for cooldown system)';
COMMENT ON COLUMN iii_it_students.week_2_updated_at IS 'Timestamp when week 2 status was last updated (for cooldown system)';
COMMENT ON COLUMN iii_it_students.week_3_updated_at IS 'Timestamp when week 3 status was last updated (for cooldown system)';
COMMENT ON COLUMN iii_it_students.week_4_updated_at IS 'Timestamp when week 4 status was last updated (for cooldown system)';
COMMENT ON COLUMN iii_it_students.week_5_updated_at IS 'Timestamp when week 5 status was last updated (for cooldown system)';
COMMENT ON COLUMN iii_it_students.week_6_updated_at IS 'Timestamp when week 6 status was last updated (for cooldown system)';
COMMENT ON COLUMN iii_it_students.week_7_updated_at IS 'Timestamp when week 7 status was last updated (for cooldown system)';
COMMENT ON COLUMN iii_it_students.week_8_updated_at IS 'Timestamp when week 8 status was last updated (for cooldown system)';
COMMENT ON COLUMN iii_it_students.week_9_updated_at IS 'Timestamp when week 9 status was last updated (for cooldown system)';
COMMENT ON COLUMN iii_it_students.week_10_updated_at IS 'Timestamp when week 10 status was last updated (for cooldown system)';
COMMENT ON COLUMN iii_it_students.week_11_updated_at IS 'Timestamp when week 11 status was last updated (for cooldown system)';
COMMENT ON COLUMN iii_it_students.week_12_updated_at IS 'Timestamp when week 12 status was last updated (for cooldown system)';
