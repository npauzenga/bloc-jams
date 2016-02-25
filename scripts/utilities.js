var forEach = function(args) {
  for(i = 0, j = args.array.length; i < j; i++) {
    args.callback(i);
  }
};
