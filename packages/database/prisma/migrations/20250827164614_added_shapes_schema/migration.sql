-- CreateEnum
CREATE TYPE "public"."Types" AS ENUM ('rect', 'circ');

-- CreateTable
CREATE TABLE "public"."Shapes" (
    "id" SERIAL NOT NULL,
    "type" "public"."Types" NOT NULL,
    "x" INTEGER,
    "y" INTEGER,
    "width" INTEGER,
    "height" INTEGER,
    "radius" INTEGER,
    "centerX" INTEGER,
    "centerY" INTEGER,

    CONSTRAINT "Shapes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Shapes" ADD CONSTRAINT "Shapes_id_fkey" FOREIGN KEY ("id") REFERENCES "public"."Chat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
