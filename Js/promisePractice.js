//promise states
const states = {
    PENDING: 'pending',
    FULFILLED: 'fulfilled',
    REJECTED: 'rejected'
}

const isThenable = maybePromise => maybePromise && typeof maybePromise.then == 'function';

class LLJSPromise{
    constructor(computation){
        this._state = states.PENDING;
        this._value = undefined;
        this._reason = undefined;
        this._thenQueue= [];
        this._finallyQueue= [];
        if( typeof computation == 'function'){
            try{
                computation(
                    this._onFulfilled.bind(this),
                    this._onRejected.bind(this)
                )
            } catch(ex){}
        }
    }
    
    then(fulfilledFn, catchFn){
        const controlledPromise = new LLJSPromise();
        this._thenQueue.push([controlledPromise, fulfilledFn, catchFn]);
        if(this._state == states.FULFILLED){
            this._propagateFulfilled();
        }else if(this._state == states.REJECTED){
            this._propagateRejected();
        }
        return controlledPromise;
    }
    catch(){
        return this.then(undefined, catchFn);
    }
    finally(){}
    _propagateFulfilled(){
        this._thenQueue.forEach(([controlledPromise, fulfilledFn])=>{
            if (typeof fulfilledFn == 'function'){
                const valueOrPromise = fulfilledFn(this._value)
                if(isThenable(valueOrPromise)){
                    valueOrPromise.then(
                        value => controlledPromise._onFulfilled(value),
                        reason => controlledPromise._onRejected(reason)
                    );
                } else {
                    controlledPromise._onFulfilled(valueOrPromise);
                }
            } else {
                return controlledPromise._onFulfilled(this._value);
            }
        });
        //reset the then queue.
        this._thenQueue = [];
    }
    _propagateRejected(){
        this._thenQueue.forEach(([controlledPromise, _, catchFn])=>{
            if (typeof catchFn == 'function'){
                const valueOrPromise = catchFn(this._reason);
                if(isThenable(valueOrPromise)){
                    valueOrPromise.then(
                        value => controlledPromise._onFulfilled(value),
                        reason => controlledPromise._onRejected(reason)
                    )
                }else{
                    // console.log(`this is fulfilled ${valueOrPromise}`)
                    controlledPromise._onFulfilled(valueOrPromise);
                }
            }else{
                // console.log(`this is on rejected ${catchFn}`)
                controlledPromise._onRejected(this._reason);
            }
        })
    }  
    _onFulfilled(value){
        // console.log(`resolved with value: ${value}`);
        if(this._state == states.PENDING){
            this._state = states.FULFILLED;
            this._value = value;
            this._propagateFulfilled();
        }
    }
    _onRejected(reason){
        if (this._state == states.PENDING){
            this._state = states.REJECTED;
            this._reason = reason;
            this._propagateRejected();
        }
    }
}


const promise = new LLJSPromise ((resolve, reject)=>{
    // in this func, we can call either resolver, or reject
    // setTimeout(()=> resolve(42),1000);
    setTimeout(()=> reject("something wrong!"),1000);
}).catch(err=>{
    console.log(`got err ${err}`);
    return 'recovered';
})

const firstThen = promise.then(value => {
    console.log(`got value: ${value}`);
    return value + 1;
})

const secondThen = firstThen.then(value=>{
    console.log(`got vlaue: ${value}`);
    return value + 1;
})
