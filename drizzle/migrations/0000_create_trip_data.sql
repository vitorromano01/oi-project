CREATE TABLE public.trip_data (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  data JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE ON public.trip_data TO authenticated;
GRANT ALL ON public.trip_data TO service_role;

ALTER TABLE public.trip_data ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read their own trip data"
  ON public.trip_data FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own trip data"
  ON public.trip_data FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own trip data"
  ON public.trip_data FOR UPDATE TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.set_trip_data_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER trip_data_set_updated_at
  BEFORE INSERT OR UPDATE ON public.trip_data
  FOR EACH ROW EXECUTE FUNCTION public.set_trip_data_updated_at();