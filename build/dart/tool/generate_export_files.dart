import 'dart:io';
import 'package:path/path.dart' as p;

// Helper utility which generates "export" files for generated protobuf files
void main() async {
  final wd = Directory.current;
  final srcDir = Directory(p.join(wd.path, 'lib', 'src'));
  final files = await srcDir
      .list(recursive: true)
      .where((e) => e.path.endsWith('.dart'))
      .toList();

  await exportStrataLib(wd, files);
  await exportGoogleLib(wd, files);
}

Future<void> exportStrataLib(
    Directory wd, Iterable<FileSystemEntity> files) async {
  final strataExportLines = files
      .where((e) => !e.path.startsWith(p.join(wd.path, 'lib', 'src', 'google')))
      .map((e) {
    final path = e.path;
    return "export '${p.relative(path, from: p.join(wd.path, 'lib')).replaceAll(r'\', '/')}';";
  }).join('\n');
  final strataOutput = File(p.join(wd.path, 'lib', 'plasma_protobuf.dart'));
  await strataOutput.writeAsString(strataExportLines);
}

Future<void> exportGoogleLib(
    Directory wd, Iterable<FileSystemEntity> files) async {
  final googleExportLines = files
      .where((e) => e.path.startsWith(p.join(wd.path, 'lib', 'src', 'google')))
      .map((e) {
    final path = e.path;
    return "export '${p.relative(path, from: p.join(wd.path, 'lib')).replaceAll(r'\', '/')}';";
  }).join('\n');
  final googleOutput = File(p.join(wd.path, 'lib', 'google_protobuf.dart'));
  await googleOutput.writeAsString(googleExportLines);
}
