Seq(
  "com.github.sbt"          % "sbt-release"               % "1.4.0",
  "com.eed3si9n"            % "sbt-buildinfo"             % "0.12.0",
  "net.bzzt"                % "sbt-reproducible-builds"   % "0.32",
  "org.typelevel"           % "sbt-fs2-grpc"              % "2.7.20",
  "com.thesamet"            % "sbt-protoc"                % "1.0.7",
  "com.github.sbt"          % "sbt-ci-release"            % "1.5.12"
).map(addSbtPlugin)

libraryDependencies ++= Seq(
  "com.thesamet.scalapb" %% "compilerplugin"           % "0.11.17",
  "com.thesamet.scalapb" %% "scalapb-validate-codegen" % "0.3.6"
)
