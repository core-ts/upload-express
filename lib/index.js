"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function handleError(err, res, log) {
  if (log) {
    log(toString(err));
    res.status(500).end('Internal Server Error');
  }
  else {
    res.status(500).end(toString(err));
  }
}
exports.handleError = handleError;
exports.error = handleError;
function toString(v) {
  if (typeof v === 'string') {
    return v;
  }
  else {
    return JSON.stringify(v);
  }
}
exports.toString = toString;
var UploadController = /** @class */ (function () {
  function UploadController(log, uploadService, getUploads, generateId, id) {
    this.log = log;
    this.uploadService = uploadService;
    this.getUploads = getUploads;
    this.generateId = generateId;
    this.id = (id && id.length > 0 ? id : 'id');
    this.uploadCover = this.uploadCover.bind(this);
    this.getGallery = this.getGallery.bind(this);
    this.updateGallery = this.updateGallery.bind(this);
    this.uploadGallery = this.uploadGallery.bind(this);
    this.deleteGalleryFile = this.deleteGalleryFile.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
  }
  UploadController.prototype.getGallery = function (req, res) {
    var _this = this;
    var id = req.params[this.id];
    if (!id || id.length === 0) {
      res.status(400).end('id cannot be empty');
    }
    else {
      this.getUploads(id)
        .then(function (obj) {
          if (obj) {
            res.status(200).json(obj).end();
          }
          else {
            res.status(404).json(null).end();
          }
        }).catch(function (err) { return handleError(err, res, _this.log); });
    }
  };
  UploadController.prototype.uploadCover = function (req, res) {
    var _this = this;
    if (!req || !req.file) {
      res.status(400).end('require file');
    }
    else {
      var id = req.params[this.id];
      if (!id || id.length === 0) {
        res.status(400).end('id cannot be empty');
      }
      else {
        var fileName = req.file.originalname;
        var data = req.file.buffer;
        var name_1 = id.toString() + "_" + fileName;
        this.uploadService
          .uploadCoverImage(id, name_1, data)
          .then(function (result) { return res.status(200).json(result); })
          .catch(function (e) { return handleError(e, res, _this.log); });
      }
    }
  };
  UploadController.prototype.uploadImage = function (req, res) {
    var _this = this;
    if (!req || !req.file) {
      res.status(400).end('require file');
    }
    else {
      var id = req.params[this.id];
      if (!id || id.length === 0) {
        res.status(400).end('id cannot be empty');
      }
      else {
        var fileName = req.file.originalname;
        var data = req.file.buffer;
        var name_2 = id.toString() + "_" + fileName;
        this.uploadService
          .uploadImage(id, name_2, data)
          .then(function (result) { return res.status(200).json(result).end(); })
          .catch(function (e) { return handleError(e, res, _this.log); });
      }
    }
  };
  UploadController.prototype.uploadGallery = function (req, res) {
    var _this = this;
    if (!req || !req.file) {
      res.status(400).end('require file');
    }
    else {
      var id = req.params[this.id];
      if (!id || id.length === 0) {
        res.status(400).end('id cannot be empty');
      }
      else {
        var data = req.file.buffer;
        var fileType = req.file.mimetype;
        var type = fileType.split('/')[0];
        var source = req.body.source;
        var upload = {
          id: id,
          source: source,
          name: id.toString() + "_" + this.generateId(),
          data: data,
          type: type,
        };
        if (!upload) {
          res.status(400).end('data cannot be empty');
        }
        else {
          this.uploadService
            .uploadGalleryFile(upload)
            .then(function (result) { return res.status(200).json(result).end(); })
            .catch(function (e) { return handleError(e, res, _this.log); });
        }
      }
    }
  };
  UploadController.prototype.updateGallery = function (req, res) {
    var _this = this;
    var id = req.params[this.id];
    if (!id || id.length === 0) {
      res.status(400).end('data cannot be empty');
    }
    else {
      var data = req.body.data;
      this.uploadService
        .updateGallery(id, data)
        .then(function (result) { return res.status(200).json(result); })
        .catch(function (err) { return handleError(err, res, _this.log); });
    }
  };
  UploadController.prototype.deleteGalleryFile = function (req, res) {
    var _this = this;
    var _a;
    var id = req.params[this.id];
    if (!id || id.length === 0) {
      res.status(400).end('id cannot be empty');
    }
    else {
      var url = (_a = req.query.url) === null || _a === void 0 ? void 0 : _a.toString();
      if (!url || url.length === 0) {
        res.status(400).end('url cannot be empty');
      }
      else {
        this.uploadService
          .deleteGalleryFile(id, url)
          .then(function (result) { return res.status(200).json(result); })
          .catch(function (err) { return handleError(err, res, _this.log); });
      }
    }
  };
  return UploadController;
}());
exports.UploadController = UploadController;
exports.UploadHandler = UploadController;
