export default class Quaterion {
    constructor(exponential = false,precision = 0){
        this.X = 0;
        this.Y = 0;
        this.Z = 0;
        this.W = 0; // Real part
        this.exponential = exponential
        this.precision = precision
    }

    //geters
    get result(){
        return this;
    }
    get array(){
        return [this.X,this.Y,this.Z,this.W];
    }
    get string(){
        return `${this.X},${this.Y},${this.Z},${this.W}`;
    }
    get rotationMatrix(){
        return [
            [ 1-2*(Math.pow(this.Y,2)+Math.pow(this.Z,2)),2*(this.X*this.Y - this.W*this.Z),2*(this.W*this.Y+this.X*this.Z)],
            [2*(this.X*this.Y + this.W*this.Z),1 - 2*(Math.pow(this.X,2)+Math.pow(this.Z,2)),2*(this.Y*this.Z - this.W*this.X)],
            [2*(this.X*this.Z - this.W*this.Y),2*(this.W*this.X + this.Y*this.Z),1 -2*(Math.pow(this.X,2)+Math.pow(this.Y,2))]
        ]
    }

    //Methods
    ConvertFromEuler(pitch,roll,yaw) {
        this.quaterion(pitch,roll,yaw);
        return this;
    }
    degrees_to_radians(degrees)
    {
        var pi = Math.PI;
        return degrees * (pi/180);
    }
    toFixed(num, fixed) {
        var re = new RegExp('^-?\\d+(?:\.\\d{0,' + (fixed || -1) + '})?');
        return num.toString().match(re)[0];
    }
    quaterion(pitch,roll,yaw){
    
        pitch = this.degrees_to_radians(pitch)
        roll  =  this.degrees_to_radians(roll)
        yaw   =  this.degrees_to_radians(yaw)

        var halfRoll = roll*0.5;
        var sinRoll =  Math.sin(halfRoll);
        var cosRoll =  Math.cos(halfRoll);

        var halfPitch = pitch*0.5;
        var sinPitch =  Math.sin( halfPitch);
        var cosPitch =  Math.cos( halfPitch);
    
        var halfYaw = yaw*0.5;
        var sinYaw =  Math.sin(halfYaw);
        var cosYaw =  Math.cos(halfYaw);
        
    
        this.X = (this.precision > 0) ? this.toFixed((cosYaw*sinPitch*cosRoll) + (sinYaw*cosPitch*sinRoll),this.precision) : (cosYaw*sinPitch*cosRoll) + (sinYaw*cosPitch*sinRoll);
        this.Y = (this.precision > 0) ? this.toFixed((cosYaw*cosPitch*sinRoll) - (sinYaw*sinPitch*cosRoll),this.precision) : (cosYaw*cosPitch*sinRoll) - (sinYaw*sinPitch*cosRoll);
        this.Z = (this.precision > 0) ? this.toFixed((sinYaw*cosPitch*cosRoll) - (cosYaw*sinPitch*sinRoll),this.precision) : (cosYaw*cosPitch*sinRoll) - (sinYaw*sinPitch*cosRoll);
        this.W = (this.precision > 0) ? this.toFixed((cosYaw*cosPitch*cosRoll) + (sinYaw*sinPitch*sinRoll),this.precision) : (cosYaw*cosPitch*sinRoll) - (sinYaw*sinPitch*cosRoll);

        if(this.exponential){
            this.X = parseFloat(this.X).toExponential()
            this.Y = parseFloat(this.Y).toExponential()
            this.Z = parseFloat(this.Z).toExponential()
            this.W = parseFloat(this.W).toExponential()
        }
    }
}