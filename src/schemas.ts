import { z } from 'zod';

export const AwsLambdaEventHeaders = z.object({
  accept: z.string(),
  'content-length': z.string(),
  host: z.string(),
  'user-agent': z.string(),
  'x-amzn-trace-id': z.string(),
  'x-forwarded-for': z.string(),
  'x-forwarded-port': z.string(),
  'x-forwarded-proto': z.string(),
});

export const AwsLambdaEventRequestContext = z.object({
  accountId: z.string(),
  apiId: z.string(),
  domainName: z.string(),
  domainPrefix: z.string(),
  http: z.object({
    method: z.string(),
    path: z.string(),
    protocol: z.string(),
    sourceIp: z.string(),
    userAgent: z.string(),
  }),
  requestId: z.string(),
  routeKey: z.string(),
  stage: z.string(),
  time: z.string(),
  timeEpoch: z.number().positive(),
});

export const KnexOpts = z.object({
  client: z.string(),
  connection: z.object({ filename: z.string() }),
  useNullAsDefault: z.boolean(),
});

////////////////////////////////////////////////////////////////////////////////

export const AwsLambdaEvent = z.object({
  body: z
    .string()
    .transform((s) => Buffer.from(s, 'base64').toString())
    .optional(),
  headers: AwsLambdaEventHeaders,
  isBase64Encoded: z.boolean(),
  rawPath: z.string(),
  rawQueryString: z.string(),
  requestContext: AwsLambdaEventRequestContext,
  routeKey: z.string(),
  version: z.string(),
});

export type AwsLambdaEventHeaders = z.infer<typeof AwsLambdaEventHeaders>;

export type AwsLambdaEventRequestContext = z.infer<
  typeof AwsLambdaEventRequestContext
>;

export const Env = z.object({
  KNEX_OPTS: z.string().transform((s) => KnexOpts.parse(JSON.parse(s))),
});

export type KnexOpts = z.infer<typeof KnexOpts>;

////////////////////////////////////////////////////////////////////////////////

export type AwsLambdaEvent = z.infer<typeof AwsLambdaEvent>;

export type Env = z.infer<typeof Env>;
