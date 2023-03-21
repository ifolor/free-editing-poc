 import { v4 as uuidv4 } from 'uuid';

 export class BasePlaceholderViewModel{
  public id: string;

  constructor(
   public translate: number[],
   public rotate: number,
   public width: number,
   public height: number,
   public top: number,
   public left: number,
   public scale: number[]){    
    this.id = uuidv4();
    this.translate = [0,0];
  }

 }

 export class ImagePlaceholderViewModel extends BasePlaceholderViewModel{
   constructor(
    public override translate: number[],
    public override rotate: number,
    public override width: number,
    public override height: number,
    public override top: number,
    public override left: number,
    public override scale: number[],
    public src: string){    
     super(translate, rotate, width, height, top, left, scale);
   }
}

export class TextPlaceholderViewModel extends BasePlaceholderViewModel{
  constructor(
   public override translate: number[],
   public override rotate: number,
   public override width: number,
   public override height: number,
   public override top: number,
   public override left: number,
   public override scale: number[],
   public text: string,
   public fontSize: number,
   public fontStyle: string){    
    super(translate, rotate, width, height, top, left, scale);
  }
}