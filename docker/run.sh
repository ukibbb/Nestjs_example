#!/bin/bash

wait_for_it.sh db:3306
npm run start:dev
