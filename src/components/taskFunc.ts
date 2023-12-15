export function handleActive(ref: React.RefObject<HTMLSpanElement|null>):void {
    if(ref.current) {
        if(ref.current.classList.contains('active')){
            ref.current.classList.remove('active');
        } else {
            ref.current.classList.add('active');
        }
    }else {
        return;
    } 
}