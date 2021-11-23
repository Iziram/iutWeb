export interface Crowd {
    name : string,
    username : string,
    message : string,
    subject : string,
    icon : string,
    media ? : Function,
    parent ? : number,
    answer ? : number;
  }
  
  export interface Querie{
    userInfos : string[],
    mediaText : string,
    avatarIcon : string,
    modal ? : HTMLButtonElement,
    parent ? : number,
    mediaAnswer ? : number;
  }