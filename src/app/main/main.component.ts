import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  noteTitle: string = '';
  noteContent: string = '';
  notes: { title: string; content: string; checked: boolean }[] = [];
  searchText: string = '';

  isEditing: boolean = false;
  editingIndex: number = -1;

  constructor() {}

  ngOnInit(): void {}

  get filteredNotes() {
    const term = this.searchText.trim().toLowerCase();
    if (!term) return this.notes;
    return this.notes.filter(
      note =>
        note.title.toLowerCase().includes(term) ||
        note.content.toLowerCase().includes(term)
    );
  }

addNote() {
  if (this.noteTitle.trim() && this.noteContent.trim()) {
    if (this.isEditing && this.editingIndex > -1) {
      // ✅ Prevent editing if note is checked
      if (this.notes[this.editingIndex].checked) {
        this.isEditing = false;
        this.editingIndex = -1;
        return;
      }

      this.notes[this.editingIndex] = {
        ...this.notes[this.editingIndex],
        title: this.noteTitle.trim(),
        content: this.noteContent.trim()
      };
      this.isEditing = false;
      this.editingIndex = -1;
    } else {
      this.notes.push({
        title: this.noteTitle.trim(),
        content: this.noteContent.trim(),
        checked: false // new notes are not checked
      });
    }

    this.noteTitle = '';
    this.noteContent = '';
  }
}


isCheckedNote: boolean = false;

editNote(index: number): void {
  const note = this.notes[index];
  if (note.checked) {
    return; // Optional safety
    
  }
  this.noteTitle = note.title;
  this.noteContent = note.content;
  this.isEditing = true;
  this.editingIndex = index;
  this.isCheckedNote = note.checked;
}


  deleteNote(index: number): void {
    this.notes.splice(index, 1);
  }

  toggleChecked(index: number): void {
    this.notes[index].checked = !this.notes[index].checked;
  }
}
