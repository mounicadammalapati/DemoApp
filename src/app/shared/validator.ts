import { AbstractControl } from "@angular/forms";

export function noWhiteSpaceOnly(c:AbstractControl){
    if(typeof c.value==="string" && c.value!=null){
        if(c.value.trim() == "" && c.value.length > 0){
            return {'allWhitespace':true};
        }
    }
    return null;
}

export function numbersOnly(c:AbstractControl){
    if(new RegExp('[^0-9]').test(c.value)){
        return {'notNumber':true};
    }
    return null;
}

