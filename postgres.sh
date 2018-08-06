#!/bin/bash
set -e

psql postgres < /docker-entrypoint-initdb.d/init.sql -U "$POSTGRES_USER"