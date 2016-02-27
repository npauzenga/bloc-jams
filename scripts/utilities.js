var forEach = function(args) {
  for(var i = 0, j = args.array.length; i < j; i++) {
    args.callback(args.array[i]);
  }
};
