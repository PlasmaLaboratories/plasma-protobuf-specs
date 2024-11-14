# protobuf-specs
Protobuf specification and definitions representing blockchain data types and communication channels.


<table>
  <tr>
    <td>
      <img width="118px" alt="Plasma logo" src="https://avatars.githubusercontent.com/u/180678331?s=400&u=7e66362202393580198b1fe92b05ddfa48beb0ed&v=4" />
    </td>
    <td valign="middle">
      <a href="https://github.com/PlasmaLaboratories/plasma-protobuf-specs/blob/main/.github/CODE_OF_CONDUCT.md"><img width="100%" alt="Code of Conduct" src="https://img.shields.io/badge/code-of%20conduct-green.svg"></a>
      <a href="https://opensource.org/licenses/MPL-2.0"><img width="100%"  alt="License" src="https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg"></a>
    </td>
    <td>
      <a href="https://twitter.com/PlasmaFDN"><img alt="@PlasmaFDN on Twitter" src="https://img.shields.io/twitter/url?style=social&url=https%3A%2F%2Ftwitter.com%2FPlasmaFDN"></a>
    </td>
    <td>
      <a href="https://s01.oss.sonatype.org/content/repositories/snapshots/org/plasmalabs/protobuf-fs2_2.13/"><img alt="@PlasmaFDN release" src="https://img.shields.io/github/v/tag/plasmalaboratories/plasma-protobuf-specs?label=release&style=plastic"></a>
    </td>
  </tr>
</table>


When testing changes, it helps to verify their behavior in the libraries that consume these protobuf specs.  You can publish the compiled protobuf as a "local" library and consume it in a different project.

## Target Languages

Protobuf specs is built using [Protobuf](https://protobuf.dev/overview/) and uses different protocol buffer compiler tools to target specific languages, Scala, Dart, TS.


### Scala

These are the step to update the specs 

1. `cd build/scala`
1. `sbt +publishLocal`
1. Check out target folder if you need to inspect generated code.
   - plasma-protobuf-specs/build/scala/protobuf-fs2/target/scala-2.13/src_managed/main
   - plasma-protobuf-specs/build/scala/protobuf-fs2/target/scala-3.4.1/src_managed/main

Build process generates Scala 2.x and Scala 3.x artifacts

- Each time a tag is pushed: releases: [releases](https://s01.oss.sonatype.org/content/repositories/snapshots/co/topl/protobuf-fs2_2.13/)
- Each time a branch commit is pushed: [snapshots](https://s01.oss.sonatype.org/content/repositories/snapshots/co/topl/protobuf-fs2_2.13/)

Both of them are published on Maven Central repository.

```sbt
  resolvers ++= Seq(
    "Sonatype Staging" at "https://s01.oss.sonatype.org/content/repositories/staging",
    "Sonatype Snapshots" at "https://s01.oss.sonatype.org/content/repositories/snapshots/",
    "Sonatype Releases" at "https://s01.oss.sonatype.org/content/repositories/releases/"
  )

 libraryDependencies +=  "org.plasmalabs" %% "protobuf-fs2" % "x.z.y"
```




### Dart
1. Install Dart [protoc_plugin](https://pub.dev/packages/protoc_plugin)
1. `cd build/dart`
1. `sh compile_protos.sh`
1. `dart run tool/generate_export_files.dart`
1. Reference the `protobuf-specs/build/dart` directory as a pubspec file dependency
    ```
    dependencies:
      topl_protobuf:
        path: /path/to/protobuf-specs/build/dart
    ```

###  Typescript

We use [Protobuf-es V1](https://github.com/bufbuild/protobuf-es/tree/v1) for generation as it's the most compliant protobuf compiler available for ts

1. `cd build/ts`
2. `sh build.sh`

## Usages
See related projects 

- [PlasmaSdkScala](https://github.com/PlasmaLaboratories/plasma-sdk-scala)
- [PlasmaNode](https://github.com/PlasmaLaboratories/plasma-node)
- [PlasmaSdkDart](https://github.com/PlasmaLaboratories/plasma-sdk-dart)