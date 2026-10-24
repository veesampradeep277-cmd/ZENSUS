#!/bin/bash
set -e
javac Main.java
java -Xmx256m -cp . Main
