var relationship1 = {
    name: 'zero',
    friends: ['nero', 'hero', 'xero'],
    logFriends: function () {
      var that = this; // relationship1을 가리키는 this를 that에 저장
      this.friends.forEach(function (friend) {
        console.log(this.name, friend); //undefined
        console.log(that.name, friend); //defined
      });
    },
  };
  relationship1.logFriends();
  
  const relationship2 = {
    name: 'zero',
    friends: ['nero', 'hero', 'xero'],
    logFriends() {
      this.friends.forEach(friend => {
        console.log(this.name, friend);
        //화살표 함수를 사용했습니다. 따라서 바깥 스코프인 logFriends()의 this를 그대로 사용할 수 있습니다. 상위 스코프의 this를 그대로 물려받는 것입니다.
      });
    },
  };
  relationship2.logFriends();