import Levels from "../lib/components/levels";
import $ from "jquery";

describe('Levels', () => {
  it('click handler should be defined', ()=> {
    let levels = new Levels();

    expect(levels.handleClick).toBeDefined();
  });
});