import { fakeAsync, flush, flushMicrotasks, tick } from "@angular/core/testing";
import { delay, of } from "rxjs";

xdescribe("Async Testing Example", () => {
  it("Asynchronous test example with Jasmin done()", (done:DoneFn) => {
    let test = false;

    setTimeout(() => {

      console.log("running assertions");

      test = true;

      expect(test).toBeTruthy();

      done();

    },1000)

  })

  it("Asynchronous test example - setTimeout()", fakeAsync(() => {

    let test = false;

    setTimeout(() => {});

    setTimeout(() => {

      console.log("running assertions");

      test = true;

      expect(test).toBeTruthy();

    },1000)

    // tick(1000);
    flush();

    expect(test).toBeTruthy();
  })
  )

  it('Asynchronous test example -  plain Promise', fakeAsync(() => {
    let test = false;

    console.log("Creating promise");

    Promise.resolve().then(() => {
      console.log('Promise 1 evaluated successfully');

      return Promise.resolve();

    }).then(() => {

      test = true;

      console.log('Promise 2 evaluated successfully');

    })

    flushMicrotasks();

    console.log('Running test assertions');
    expect(test).toBeTruthy();
  })
  )

  it("Asynchronous test example - Promises + setTimeout()", fakeAsync(() => {
    let counter = 0;
    Promise.resolve()
            .then(() => {
              counter+=10;
              setTimeout(() => {
                counter += 1;
              },1000)
            })
    expect(counter).toBe(0);

    flushMicrotasks();

    expect(counter).toBe(10);

    tick(500);

    expect(counter).toBe(10);

    tick(500);

    expect(counter).toBe(11);

  })
  )

  it('Asynchronous test example - Observables', fakeAsync(() => {
    let test = false;
    console.log('Creating Observable');
    const test$ = of(test).pipe(delay(1000));

    test$.subscribe(() => {
      test = true;
    })

    tick(1000);

    console.log('Running test assertions');

    expect(test).toBe(true);
  })
  )
})
