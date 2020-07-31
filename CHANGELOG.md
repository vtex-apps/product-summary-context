# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.4.3] - 2020-07-31

### Changed
- Send `product` and `selectedItem` to `ProductGroupContext`.

## [0.4.2] - 2020-07-20

### Fixed
- Deal with `undefined` products when accessing the `selectedProperties` field.

## [0.4.1] - 2020-07-13

### Added
- `selectedItem` prop to `ProductSummaryProvider`

## [0.4.0] - 2020-07-10

### Added
- `property__VariationName=VariationValue` query string to the product query.

## [0.3.0] - 2019-10-15
### Added
- `SET_PRODUCT_QUERY` action

## [0.2.0] - 2019-08-27
### Added
- `SET_QUANTITY` action
- `selectedItem` and `selectedQuantity` to context state

## [0.1.0] - 2019-07-02
### Added
- Initial release.
