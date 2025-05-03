/* global Word console */

export async function insertText(text: string) {
  // Write text to the document.
  try {
    await Word.run(async (context) => {
      let body = context.document.body;
      body.insertParagraph(text, Word.InsertLocation.end);
      await context.sync();
    });
  } catch (error) {
    console.log("Error: " + error);
  }
}

export async function getSelectedText(): Promise<string | null> {
  try {
    return await Word.run(async (context) => {
      const selection = context.document.getSelection();
      selection.load("text");
      await context.sync();
      return selection.text || null;
    });
  } catch (error) {
    console.log("Error: " + error);
    return null;
  }
}

export async function replaceSelectedText(newText: string, mode: string = "decrypt") {
  try {
    await Word.run(async (context) => {
      const selection = context.document.getSelection();
      selection.insertText(newText, Word.InsertLocation.replace);
      if (mode === "encrypt") {
        selection.font.color = "red";
        selection.font.underline = Word.UnderlineType.double;
      }
      if (mode === "decrypt") {
        selection.font.color = "black";
        selection.font.underline = Word.UnderlineType.none;
      }
      await context.sync();
    });
  } catch (error) {
    console.log("Error: " + error);
  }
}
