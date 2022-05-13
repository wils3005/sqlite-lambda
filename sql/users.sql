create table if not exists users (
  id integer primary key,
  created_at timestamp not null default current_timestamp,
  updated_at timestamp not null default current_timestamp,
  metadata text not null default '{}',
  username text not null unique,
  password_hash text not null,
  password_salt text not null
);

-- insert into users (username, password_hash, password_salt, organization_id)
-- values (
--   'admin',
--   '',
--   '',
--   ''
-- );
