import { AwsLambdaEvent, Env } from './schemas';

import knex from 'knex';

const { KNEX_OPTS } = Env.parse(process.env);

////////////////////////////////////////////////////////////////////////////////

export const handler = async (event: unknown, context: unknown) => {
  const response = {
    body: '{"message":"OK"}',
    headers: {
      'content-type': 'application/json',
    },
    statusCode: 200,
  };

  const logMsg = { event, context, response };
  try {
    const { body } = AwsLambdaEvent.parse(event);
    Object.assign(logMsg, { body });
    const sql = 'select * from users';
    Object.assign(logMsg, { sql });
    const result = await knex(KNEX_OPTS).raw<unknown[]>(sql);
    response.body = JSON.stringify({ message: result });
    return response;
  } catch (error) {
    Object.assign(response, {
      body: '{"message":"Bad Request"}',
      statusCode: 400,
    });

    Object.assign(logMsg, { response, error: String(error) });
    return response;
  } finally {
    process.stdout.write(JSON.stringify(logMsg));
  }
};
