type OutputRef<T> = Readonly<{
  component: string;
  output: string;
  readonly __type?: T;
}>;

const output = <T>(component: string, name: string): OutputRef<T> => ({
  component,
  output: name,
});

const definition = {
  kind: "cloudflare.worker",
  name: "service-e",
  project: ".",
  inputs: {
    SUPABASE_URL: output<string>("service-d", "restUrl"),
    SUPABASE_SCHEMA: output<string>("service-d", "schema"),
    SUPABASE_ANON_KEY: output<string>("service-d", "anonKeyRef"),
  },
} as const;

console.log(JSON.stringify(definition));
export default definition;
