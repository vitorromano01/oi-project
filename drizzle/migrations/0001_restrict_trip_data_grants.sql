REVOKE ALL ON public.trip_data FROM anon;
REVOKE ALL ON public.trip_data FROM PUBLIC;
REVOKE DELETE, TRUNCATE, REFERENCES, TRIGGER ON public.trip_data FROM authenticated;
GRANT SELECT, INSERT, UPDATE ON public.trip_data TO authenticated;
GRANT ALL ON public.trip_data TO service_role;