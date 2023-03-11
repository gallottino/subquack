# subquack

Query engine for a Substrate node

## How it works

Subquack is a query engine with a GrapQL-like syntax useful to query every storage of a blockchain built with substrate. It doesn't need a configuration due the fact that through the metadata of the node, the engine can recognize every storage and consequence every allowed query.

## Syntax

- [ ] Storage queries
- [ ] Structured queries
- [ ] Fields
- [ ] Nesting

## Example

Assuming you have in you node something like this:

```rust
struct Person {
    age: u32,
    vote: u32
}

#[pallet::storage]
pub(super) type People<T: Config> = StorageDoubleMap<
    _,
    Twox64Concat,
    ComponentId<T>,
    Blake2_128Concat,
    u32,
    Person<T>,
>;

```

You can query aggregated people based on a number that is the key of the storage.

Subquack allows you to do this:

```
european {
    italian {
        people(0){
            age
        },
        people(1) {
            age
        },
    },
    french {
        people(2) {
            age
        }
    }
}
```

and get this result:

```json
{
  "european": {
    "italian": {
      "people(0)": {
        "age": 24
      },
      "people(1)": {
        "age": 30
      }
    },
    "french": {
      "people(2)": {
        "age": 14
      }
    }
  }
}
```
