-- Create users table
CREATE TABLE public.users (
  id text NOT NULL,
  name text,
  current_location text,
  connections ARRAY,
  streak_count smallint DEFAULT '0'::smallint,
  time_avail ARRAY,
  CONSTRAINT users_pkey PRIMARY KEY (id)
);

-- Create jobs table
CREATE TABLE public.jobs (
  id text NOT NULL,
  company text,
  location text,
  position text,
  industry text,
  level text,
  CONSTRAINT jobs_pkey PRIMARY KEY (id)
);

-- Create courses table
CREATE TABLE public.courses (
  user_id text,
  course_name text,
  CONSTRAINT courses_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id)
);

-- Create job_history table
CREATE TABLE public.job_history (
  user_id text,
  job_id text,
  CONSTRAINT fk_job FOREIGN KEY (job_id) REFERENCES public.jobs(id),
  CONSTRAINT job_history_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id)
);

-- Create posts_activity table
CREATE TABLE public.posts_activity (
  user_id text,
  post_text text,
  "Picture link" text,
  Comments ARRAY,
  num_of_likes smallint DEFAULT '0'::smallint,
  CONSTRAINT posts_activity_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id)
);

-- Create school_history table
CREATE TABLE public.school_history (
  user_id text,
  school_name text,
  degree text,
  graduation_year integer,
  CONSTRAINT school_history_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id)
);

-- Create skills table
CREATE TABLE public.skills (
  skill_name text NOT NULL,
  CONSTRAINT skills_pkey PRIMARY KEY (skill_name)
);

-- Create user_skills table
CREATE TABLE public.user_skills (
  user_id text,
  skill_name text,
  CONSTRAINT user_skills_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id),
  CONSTRAINT user_skills_skill_name_fkey FOREIGN KEY (skill_name) REFERENCES public.skills(skill_name)
);

-- Create indexes for better performance
CREATE INDEX idx_users_id ON users(id);
CREATE INDEX idx_jobs_id ON jobs(id);
CREATE INDEX idx_courses_user_id ON courses(user_id);
CREATE INDEX idx_job_history_user_id ON job_history(user_id);
CREATE INDEX idx_job_history_job_id ON job_history(job_id);
CREATE INDEX idx_posts_activity_user_id ON posts_activity(user_id);
CREATE INDEX idx_school_history_user_id ON school_history(user_id);
CREATE INDEX idx_skills_skill_name ON skills(skill_name);
CREATE INDEX idx_user_skills_user_id ON user_skills(user_id);
CREATE INDEX idx_user_skills_skill_name ON user_skills(skill_name);

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts_activity ENABLE ROW LEVEL SECURITY;
ALTER TABLE school_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_skills ENABLE ROW LEVEL SECURITY;

-- Create policies (you can customize these based on your auth requirements)
-- For now, allowing all operations (you should restrict these based on your needs)
CREATE POLICY "Allow all operations on users" ON users FOR ALL USING (true);
CREATE POLICY "Allow all operations on jobs" ON jobs FOR ALL USING (true);
CREATE POLICY "Allow all operations on courses" ON courses FOR ALL USING (true);
CREATE POLICY "Allow all operations on job_history" ON job_history FOR ALL USING (true);
CREATE POLICY "Allow all operations on posts_activity" ON posts_activity FOR ALL USING (true);
CREATE POLICY "Allow all operations on school_history" ON school_history FOR ALL USING (true);
CREATE POLICY "Allow all operations on skills" ON skills FOR ALL USING (true);
CREATE POLICY "Allow all operations on user_skills" ON user_skills FOR ALL USING (true);