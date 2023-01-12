;;; deno-bridge-echo.el --- Description -*- lexical-binding: t; -*-
;;
;; Copyright (C) 2023 nailuoGG
;;
;; Author: nailuoGG <>
;; Maintainer: nailuoGG <>
;; Created: January 12, 2023
;; Modified: January 12, 2023
;; Version: 0.0.1
;; Keywords: abbrev bib c calendar comm convenience data docs emulations extensions faces files frames games hardware help hypermedia i18n internal languages lisp local maint mail matching mouse multimedia news outlines processes terminals tex tools unix vc wp
;; Homepage: https://github.com/liujiale/deno-bridge-echo
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
(deno-bridge-start "echo" deno-bridge-echo-ts-path)

(provide 'deno-bridge-echo)
;;; deno-bridge-echo.el ends here
