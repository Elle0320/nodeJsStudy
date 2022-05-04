
//==================es6//==================//==================
const candyMachine = {
    status: {
      name: 'node',
      count: 5,
    },
    getCandy() {
        candyMachine.status.count--;
      return candyMachine.status.count;
    },
  };
  const { getCandy, status: { count } } = candyMachine;

//================== before es 6//==================
//   var candyMachine = {
//     status: {
//       name: 'node',
//       count: 5,
//     },
//     getCandy: function () {
//         candyMachine.status.count--;
//       return candyMachine.status.count;
//     },
//   };
//   var getCandy = candyMachine.getCandy;
//   var count = candyMachine.status.count;
//==================//==================//==================

  console.log(count);
  console.log(getCandy());
  console.log(candyMachine.getCandy());
  console.log(getCandy());
  console.log(candyMachine.getCandy());
  console.log(count);