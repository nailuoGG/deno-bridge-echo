;;; deno-bridge-echo.el --- Description -*- lexical-binding: t; -*-
;;
;; Copyright (C) 2023 nailuoGG
;;
;; Author: nailuoGG <>
;; Maintainer: nailuoGG <>
;; Created: January 12, 2023
;; Modified: January 12, 2023
;; Version: 0.0.1
;; Keywords:  lisp local tools
;; Homepage: https://github.com/nailuoGG/deno-bridge-echo
;; Package-Requires: ((emacs "24.3"))
;;
;; This file is not part of GNU Emacs.
;;
;;; Commentary:
;;
;;  Description
;;
;;; Code:


(require 'deno-bridge)
(setq deno-bridge-echo-ts-path (concat (file-name-directory load-file-name) "deno-bridge-echo.ts"))

(defun deno-bridge-echo-start ()
  "Start deno bridge echo."
  (interactive)
  (deno-bridge-start "deno-bridge-echo" deno-bridge-echo-ts-path))


(defun deno-bridge-echo-restart ()
  "Restart deno bridge echo and show process."
  (interactive)
  (deno-bridge-exit)
  (deno-bridge-echo-start)
  (list-processes))

(deno-bridge-echo-start)
(provide 'deno-bridge-echo)
;;; deno-bridge-echo.el ends here
