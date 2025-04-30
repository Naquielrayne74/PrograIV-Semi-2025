<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Usuario;

class UsuarioController extends Controller
{
    public function index()
    {
        $usuarios = Usuario::all();
        return view('registros', compact('usuarios'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'fullname' => 'required',
            'birthdate' => 'required',
            'gender' => 'required',
            'email' => 'required|email|unique:usuarios,email',
            'password' => 'required'
        ]);

        Usuario::create([
            'fullname' => $request->fullname,
            'birthdate' => $request->birthdate,
            'gender' => $request->gender,
            'email' => $request->email,
            'password' => bcrypt($request->password)
        ]);

        return redirect()->route('usuarios.index');
    }

    public function edit($id)
    {
        $usuario = Usuario::findOrFail($id);
        return response()->json($usuario);
    }

    public function update(Request $request, $id)
    {
        $usuario = Usuario::findOrFail($id);

        $usuario->update($request->all());

        return redirect()->route('usuarios.index');
    }

    public function destroy($id)
    {
        $usuario = Usuario::findOrFail($id);
        $usuario->delete();

        return redirect()->route('usuarios.index');
    }
}
