import { useEffect, useState } from "react";
import { fromEvent } from "rxjs";
import { map, startWith } from "rxjs/operators";

export default ref => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const sub$ = fromEvent(window, "resize")
      .pipe(
        map(() => ref.current),
        startWith(ref.current),
        map(page => page.getBoundingClientRect().width)
      )
      .subscribe(setWidth);
    return () => sub$.unsubscribe();
  }, [ref]);

  return width;
};
