# FP-FLOW [![Build Status](https://travis-ci.com/seb-bizeul/fp-flow.svg?branch=master)](https://travis-ci.com/seb-bizeul/fp-flow) 

## Documentation

### Maybe type

#### Construct

    nothing :: () -> Maybe ()

    just :: a -> Maybe a 

    of :: a -> Maybe a

    fromNullable :: a -> Maybe a

    fromEither :: Either a b -> Maybe b

#### Transform

    map :: (a -> b) -> Maybe a -> Maybe b

    map2 :: (a -> b) -> Maybe a -> Maybe a -> Maybe b

    map3 :: (a -> b) -> Maybe a -> Maybe a -> Maybe a -> Maybe b

    map4 :: (a -> b) -> Maybe a -> Maybe a -> Maybe a -> Maybe a -> Maybe b

    chain :: (a -> Maybe b) -> Maybe a -> Maybe b

    flatMap :: (a -> Maybe b) -> Maybe a -> Maybe b

    bind :: (a -> Maybe b) -> Maybe a -> Maybe b

    ap :: Maybe (a -> b) -> Maybe a -> Maybe b

#### Compare

    equals :: Maybe a -> Maybe a -> Bool

    isJust :: Maybe a -> Bool

    isNothing :: Maybe a -> Bool

#### Unwrap

    get :: Maybe a -> a

    getOrElse :: (() -> a) -> a

    fold :: (a -> b) -> (a -> b) -> b



### Other types and examples are coming soon...
