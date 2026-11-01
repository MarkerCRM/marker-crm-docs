---
title: The builder
description: Find your way around the automation builder — the canvas, adding and moving steps, the toolbar, the side panel and the keyboard shortcuts.
sidebar:
  order: 2
---

The builder is where you draw an automation. The trigger sits at the top, the steps run down
the page below it, and the panel on the right shows whatever you have selected. Every change
saves on its own a moment after you make it — the label beside the title reads **Saving…**,
then **Saved** (or **Draft saved** on a live automation with unpublished changes).

![The automation builder, with the trigger at the top of the canvas, steps below it splitting into two paths, and the overview panel on the right](/images/placeholder.svg)

## The header

From left to right:

- **Automations** — back to the list.
- **The title** — click it to rename the automation.
- **The state menu** — **Draft**, **Active** or **Paused**. Choosing **Active** opens the
  review rather than switching straight away; see
  [Going live and editing](/automations/going-live/).
- **Full screen** — hides the WordPress admin around the builder.
- **Stats** — shows how many contacts reached and are waiting at each step, on the canvas.
- **Settings** — opens the automation's settings: re-entry and **Stop early**.
- **Reports** — opens the automation's [report](/automations/reports/).
- **The menu** — **Delete automation**.
- **Review** — or **Publish changes** on a live automation with a draft. A red dot means
  something has to be fixed first.

## The canvas

The flow reads top to bottom. When a step splits into paths — **If / else**, **A/B split**,
or a **Wait for an event** with two outcomes — the paths sit side by side and rejoin at a
**+** before whatever follows the split.

Each path is labelled on its first line: **Everyone else**, **It happened**, **Time ran
out**, **Path 1**, or the name you gave it. Click a label to open the step that chooses the
path. With **Stats** on, the label also shows the share of contacts who went that way.

A card with a warning triangle still needs setting up. Hover over the triangle to see what is
missing.

### Adding steps

There are four ways to add a step:

- The **+** at the end of a line — after the last step, or at the end of a path.
- The small **+** on any connecting line — **Insert a step here**.
- The **+** where paths rejoin — **Add a step after the split, for everyone**.
- **Add step** in the toolbar at the bottom, or press <kbd>B</kbd>. This adds to the end of
  the main line.

Each opens **Add a step** in the right-hand panel. See
[Actions, waits and paths](/automations/steps/) for what is in it.

### Moving steps around

Drag any card to place it where you like on the canvas. To move several at once, drag on an
empty area in **Select** mode to draw a box around them (in **Pan** mode, hold
<kbd>Shift</kbd> while you drag), then drag any one of them. The builder remembers where you
put each card.

A step you have never placed by hand keeps its spot one gap below whatever comes before it,
so when you drag a step, the unplaced steps after it follow along.

:::note[Where a card sits does not change the order]
The canvas is only a picture. Contacts follow the lines between steps, not where the cards
are drawn. To change the order, open the three-dot menu on its card and choose
**Move earlier** or **Move later**.
:::

**Tidy up** (the wand in the toolbar) forgets every position you set and lays the whole flow
out neatly again. It is greyed out when the flow is already tidy.

### Each card's menu

Each step card has a three-dot menu with **Move earlier**, **Move later**, **Duplicate** and
**Delete**. Duplicating a step that has paths copies the paths and everything on them too.

Deleting a step asks you to confirm. If contacts are waiting on it, the message says how many
— they move on to the next step as soon as it goes.

## The bottom toolbar

| Control | What it does |
|---|---|
| **Undo** / **Redo** | Steps back and forward through your edits, up to 100. |
| **Zoom** menu (shows the current %) | **Zoom in**, **Zoom out**, **Zoom to 100%**, **Zoom to fit**. |
| **Select** | Click to select cards; drag on the background to draw a selection box. |
| **Pan** | Drag anywhere to move around the canvas. |
| **Add step** | Adds a step at the end of the main line. |
| **Tidy up** | Clears every position you set by hand. |

In either mode you can scroll to move around. A long flow opens at a readable size starting
from the trigger, rather than shrunk to fit the screen; press <kbd>1</kbd> to see the whole
thing.

## The right-hand panel

The panel changes with what you are doing. Close it with the **×** at its top.

### With nothing selected: the overview

Click an empty part of the canvas to see the overview:

- **Description** — what the automation is for. Only your team sees this.
- **Checklist** — everything that stops the automation going live (red, **to fix**) and
  anything that may surprise you (amber, **to review**). Click **Fix** or **Show** on an item
  to jump to it.
- **Helpful resources** — **Documentation** opens these pages; **Automation settings** opens
  the settings panel.
- **Shortcuts** — the keyboard shortcuts below.

On a narrow screen (below 1100 pixels wide) the overview starts closed.

### With the trigger selected

The trigger's own settings, a **Change** button to pick a different trigger, and **Only if**
rules. See [Triggers](/automations/triggers/).

### With a step selected

- **Internal name** — the name on the card. Only your team sees it.
- **Internal description** — an optional note, under the disclosure.
- The step's own settings.
- **Delete step** at the bottom.

An email step shows **The email** with **Write the email** (or **Edit the email**), **Send a
test**, and an eye button to **See what it looks like**.

### Automation settings

Opened from **Settings** in the header. It holds **If someone triggers it again** (see
[re-entry](/automations/triggers/#if-someone-triggers-it-again)) and **Stop early** (see
[Stop early](/automations/steps/#stop-early)).

## Stats on the canvas

Turn on **Stats** in the header to see, on each card, how many contacts **reached** it and
how many are **waiting** there now. Email steps also show the share **opened** and
**clicked**, and how many **left** (unsubscribed) from that email. Path labels show what share
of contacts took each path.

Turn it off again to get a cleaner picture while you edit.

## Keyboard shortcuts

Shortcuts do nothing while you are typing in a field or while a dialog is open. On Windows
and Linux, use <kbd>Ctrl</kbd> where this table says <kbd>⌘</kbd>.

| Key | Does |
|---|---|
| <kbd>B</kbd> | Add a step at the end of the main line |
| <kbd>⌘</kbd> <kbd>Z</kbd> | Undo |
| <kbd>⌘</kbd> <kbd>Shift</kbd> <kbd>Z</kbd> or <kbd>⌘</kbd> <kbd>Y</kbd> | Redo |
| <kbd>⌘</kbd> <kbd>D</kbd> | Duplicate the selected step |
| <kbd>Delete</kbd> or <kbd>Backspace</kbd> | Delete the selected step (asks first) |
| <kbd>Esc</kbd> | Close **Add a step**, or clear the selection |
| <kbd>+</kbd> or <kbd>=</kbd> | Zoom in |
| <kbd>-</kbd> | Zoom out |
| <kbd>0</kbd> | Zoom to 100% |
| <kbd>1</kbd> | Zoom to fit |
| <kbd>V</kbd> | Select mode |
| <kbd>H</kbd> | Pan mode |

Inside **Add a step**, use <kbd>↑</kbd> and <kbd>↓</kbd> to move through the list,
<kbd>Enter</kbd> to add the highlighted step and <kbd>Esc</kbd> to close.
