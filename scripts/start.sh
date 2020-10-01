cd ../server
npm run start &
P1=$!
cd ../client
yarn start &
P2=$!
wait $P1 $P2