import { openDB } from "idb";
import { DRAFT_NOTES } from "../constants";

const DB_NAME = "kip_db";
const TBL_NOTES = "tbl_notes";
const TBL_UN_SYNC_NOTES = "tbl_un_sync_notes";
const TBL_LABELS = "tbl_labels";

const getNotes = () => {
  const locStr = window.localStorage.getItem(DRAFT_NOTES);
  try {
    const notes = JSON.parse(locStr);
    return notes || [];
  } catch (e) {
    return [];
  }
};

export const addNote = note => {
  try {
    const notes = getNotes();
    notes.push(note);
    const locStr = JSON.stringify(notes);
    window.localStorage.setItem(DRAFT_NOTES, locStr);
  } catch (error) {
    console.log("add note error", error);
  }
};

class DB {
  db;

  constructor() {
    this.initDB();
  }

  async initDB() {
    this.db = await openDB(DB_NAME, 1, {
      upgrade: (db, oldVersion, newVersion, transaction) => {
        console.log("old", oldVersion, newVersion);
        db.createObjectStore(TBL_NOTES, {
          keyPath: "id",
          autoIncrement: true
        });
        db.createObjectStore(TBL_UN_SYNC_NOTES, {
          keyPath: "id",
          autoIncrement: true
        });
        db.createObjectStore(TBL_LABELS, {
          keyPath: "id",
          autoIncrement: true
        });
      }
    });
  }

  saveNote(note) {
    const { id, ...rest } = note;
    return Promise.all([
      this.db.add(TBL_UN_SYNC_NOTES, {
        noteId: id,
        ...rest
      }),
      this.db.add(TBL_NOTES, {
        noteId: id,
        ...rest
      })
    ]);
  }

  async saveAllNotes(notes) {
    try {
      const tx = this.db.transaction(TBL_NOTES, "readwrite");
      this.db.clear(TBL_NOTES);
      notes.forEach(({ id, ...rest }) => {
        this.db.add(TBL_NOTES, {
          noteId: id,
          ...rest
        });
      });
      return await tx.done;
    } catch (error) {
      return [];
    }
  }

  deleteAllNotes() {
    return this.db.clear();
  }

  getAllNotes() {
    return this.db.getAll(TBL_NOTES);
  }
}

export default new DB();
