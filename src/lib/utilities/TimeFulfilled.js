
class TimeFulfilled
{
    constructor(wait)
    {
        this.wait = wait || 1500
        this.timer = undefined
    }
    execute( callback )
    {
        clearTimeout(this.timer);
        this.timer = setTimeout( callback, this.wait);
    }
}

export default TimeFulfilled