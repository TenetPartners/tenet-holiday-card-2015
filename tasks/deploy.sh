#!/bin/bash
echo "Starting deployment"
gulp deploy --target=dev || exit 1
echo "Deployed successfully."
exit 0
