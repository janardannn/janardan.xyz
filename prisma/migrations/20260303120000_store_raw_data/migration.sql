-- Rename hashed columns to raw equivalents
ALTER TABLE "Visitor" RENAME COLUMN "ipHash" TO "ip";
ALTER TABLE "Visitor" RENAME COLUMN "canvasHash" TO "canvasData";
ALTER TABLE "Visitor" RENAME COLUMN "audioHash" TO "audioData";
