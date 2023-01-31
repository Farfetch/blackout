package='yalc'
if [ `npm list -g | grep -c $package` -eq 0 ]; then
    npm install -g $package --no-shrinkwrap
fi

if [ ! $1 ]; 
then
  for i in ./packages/*
  do
    cd "$i"
    yalc publish
    cd ../..
  done
else
  echo "Folder package selected: $1";
  cd packages/$1
  yalc publish
fi
